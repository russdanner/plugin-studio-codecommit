import plugins.org.rd.plugin.codecommit.CodeCommit

def codeCommit = new CodeCommit(pluginConfig)

return codeCommit.createPullRequest(params.repoName, params.title, params.sourceBranch, params.targetBranch)