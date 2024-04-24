# Studio AWS Code Commit
This plugin allows users of Crafter Studio to create and approve a pull request easily.


# Installation

Install the plugin via Studio's Plugin Management UI under `Site Tools` > `Plugin Management`.

## Install based on this repository

You can also install this plugin by cloning this repository and using the Studio API.

1. Create a Studio JWT Token.
2. Execute the following CURL command a terminal

```bash
curl --location --request POST 'http://SERVER_AND_PORT/studio/api/2/marketplace/copy' \
--header 'Authorization: Bearer THE_JWT_TOKEN_FOR_STUDIO' \
--header 'Content-Type: application/json' \
--data-raw '{
  "siteId": "editorial",
  "path": "/home/russdanner/code/plugin-studio-codecommit",
  "parameters": {  
        "awsApiKey": "A KEY",
        "awsApiSecret": "A SECRET",
        "awsRegion": "us-east-1"
    }
}'

```
OR to use profile credentials

```bash
curl --location --request POST 'http://SERVER_AND_PORT/studio/api/2/marketplace/copy' \
--header 'Authorization: Bearer THE_JWT_TOKEN_FOR_STUDIO' \
--header 'Content-Type: application/json' \
--data-raw '{
  "siteId": "editorial",
  "path": "/home/russdanner/code/plugin-studio-codecommit",
  "parameters": {  
        "useProfileCredentials": "true",
        "awsRegion": "us-east-1"
    }
}'

```

useProfileCredentials
# Widget Configuration Guide

## Toolbar 
```xml
<widget id="org.rd.plugin.codecommit.CreatePullRequest">
    <plugin id="org.rd.plugin.codecommit" site="{site}" type="apps" name="codecommit" file="index.js"/>
    <configuration>
        <useIcon>false</useIcon>
    
        <repoName>myrepo</repoName>
        <sourceBranch>qa</sourceBranch>
        <targetBranch>master</targetBranch>
        <prTitle>Approve Content Promotion via Studio</prTitle>
        <createAndMergePullRequestLabel>Promote Content</createAndMergePullRequestLabel>
    </configuration>
</widget>                
              
```
