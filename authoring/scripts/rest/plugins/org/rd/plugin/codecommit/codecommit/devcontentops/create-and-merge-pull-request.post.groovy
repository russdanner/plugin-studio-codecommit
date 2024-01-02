import plugins.org.rd.plugin.codecommit.CodeCommit

def codecommit = new CodeCommit(pluginConfig)

return codecommit.createAndMergePullRequest(params.repoName, params.title, params.sourceBranch, params.targetBranch)