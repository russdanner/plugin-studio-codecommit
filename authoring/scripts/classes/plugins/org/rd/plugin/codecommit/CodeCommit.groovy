package plugins.org.rd.plugin.codecommit

@Grab(group='com.amazonaws', module='aws-java-sdk-codecommit', version='1.12.629', initClass=false)

import org.slf4j.Logger
import org.slf4j.LoggerFactory

import com.amazonaws.auth.*
import com.amazonaws.auth.AWSCredentialsProvider
import com.amazonaws.auth.DefaultAWSCredentialsProviderChain
import com.amazonaws.services.codecommit.AWSCodeCommit
import com.amazonaws.services.codecommit.AWSCodeCommitClientBuilder
import com.amazonaws.services.codecommit.model.CreatePullRequestRequest
import com.amazonaws.services.codecommit.model.ListPullRequestsRequest
import com.amazonaws.services.codecommit.model.Target
import com.amazonaws.services.codecommit.model.MergePullRequestByFastForwardRequest

/**
 * API service wrapper for AWS CodeCommit
 */
public class CodeCommit {

    private static final Logger logger = LoggerFactory.getLogger(CodeCommit.class);

    def pluginConfig
    def codeCommitClient

   /**
     * constructor
     */
    CodeCommit(pluginConfig) {
        this.pluginConfig = pluginConfig
    }

    /**
     * Look up credentials for AWS from the site
     * @param siteId
     * @return object containing credentials
     */
    def lookupAwsMediaCredentials() {
        def creds = [region: "", apiKey: "", apiSecret: ""]

        creds.region = pluginConfig.getString("awsRegion")
        creds.apiKey = pluginConfig.getString("awsApiKey")
        creds.apiSecret = pluginConfig.getString("awsApiSecret")
        creds.useProfile = pluginConfig.getString("useProfileCredentials")

        return creds
    }

    /**
     * return the codecomot client. If one does not exist for the instance, create it.
     * @param siteId
     */
    def createCodeCommitClient() {

        if(this.codeCommitClient == null) {
            def creds = this.lookupAwsMediaCredentials()

            def credProvider
            if("true".equals(creds.useProfile)) {
                //credProvider = DefaultAWSCredentialsProviderChain.instance()
                credProvider = DefaultAWSCredentialsProviderChain.newInstance()
            }
            else {
                credProvider = (AWSCredentialsProvider) (new AWSStaticCredentialsProvider( new BasicAWSCredentials(creds.apiKey, creds.apiSecret)))
            }
        }
           this.codeCommitClient = AWSCodeCommitClientBuilder.standard().withRegion(creds.region).withCredentials(credProvider).build()

        return this.codeCommitClient
    }

    /**
     * list pull requests
     */
    def listPullRequests(repoId) {
        def client = this.createCodeCommitClient()
        def request = new ListPullRequestsRequest()
        request.setRepositoryName(repoId)

        //System.out.println("Listing PRs for project "+ repoId)
        def result = client.listPullRequests(request)

        return result
    }

    /** 
     * Create a Pull request
     */
    def createPullRequest(repoId, title, sourceBranch, targetBranch) {
        def client = this.createCodeCommitClient()

        def target = new Target()
        target.setRepositoryName(repoId)
        target.setSourceReference(sourceBranch)
        target.setDestinationReference(targetBranch)

        def request = new CreatePullRequestRequest()
        request.setTitle(title)
        request.setTargets([ target ])

        def result = client.createPullRequest(request)

        return result
    }

    /**
     * Merge Pullreqest
     */
    def mergePullRequest(repoId, id) {
        def client = this.createCodeCommitClient()

        def request = new MergePullRequestByFastForwardRequest()
        request.setRepositoryName(repoId)
        request.setPullRequestId(id)

        def result = client.mergePullRequestByFastForward(request)

        return result
    }

    /**
     * Create and approve a pull request
     */
    def createAndMergePullRequest(repoId, title, sourceBranch, targetBranch) {
        def createResult = createPullRequest(repoId, title, sourceBranch, targetBranch)
        //System.out.println("Created Merge Request: ${createResult.pullRequest.pullRequestId}")

        def mergeResult = mergePullRequest(repoId, createResult.pullRequest.pullRequestId)
        //System.out.println("Merged request: ${mergeResult.pullRequest.pullRequestId}")

        return mergeResult
    }
}
