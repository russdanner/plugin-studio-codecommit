import plugins.org.rd.plugin.codecommit.CodeCommit

def codeCommit = new CodeCommit(pluginConfig)

return codeCommit.listPullRequests(params.repoName)