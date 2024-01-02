import * as React from 'react';
import { Alert, Backdrop, CircularProgress, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import useEnv from '@craftercms/studio-ui/hooks/useEnv';
import ChecklistRtlRoundedIcon from '@mui/icons-material/ChecklistRtlRounded';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { post } from '@craftercms/studio-ui/utils/ajax';

export function CreatePullRequest(props) {
  const {
    useIcon,
    repoName,
    sourceBranch,
    targetBranch,
    prTitle,
    // createMergeRequestLabel,
    createAndMergePullRequestLabel
    // approveMergeRequestLabel,
    // rejectMergeRequestLabel,
    // listMergeRequestsLabel
  } = props;

  const siteId = useActiveSiteId();
  const [snackMessage, setSnackMessage] = React.useState('');
  const [snackSuccess, setSnackSuccess] = React.useState(true);
  const [snackShow, setSnackShow] = React.useState(false);
  const [progressShow, setProgressShow] = React.useState(false);
  const PLUGIN_SERVICE_BASE = '/studio/api/2/plugin/script/plugins/org/rd/plugin/codecommit/codecommit/devcontentops';

  const handleCreateAndApproveMergeClick = (event: React.MouseEvent<HTMLElement>) => {
    setProgressShow(true);
    let serviceUrl = `${PLUGIN_SERVICE_BASE}/create-and-merge-pull-request.json?siteId=${siteId}&repoName=${repoName}&title=${prTitle}&sourceBranch=${sourceBranch}&targetBranch=${targetBranch}`;

    post(serviceUrl).subscribe({
      next: (response) => {
        // sort our our attachments vs everything else
        let details = response.response.result;
        setSnackMessage(
          `${createAndMergePullRequestLabel ? createAndMergePullRequestLabel : 'Pull'} completed successfully.`
        );
        setSnackSuccess(true);
        setSnackShow(true);
      },
      error: (response) => {
        setSnackMessage(`${createAndMergePullRequestLabel ? createAndMergePullRequestLabel : 'Pull'} failed.`);
        setSnackSuccess(false);
        setSnackShow(true);
      }
    });
  };

  function handleSnackClose(event: Event | React.SyntheticEvent<any, Event>, reason: SnackbarCloseReason): void {
    setProgressShow(false);
    setSnackShow(false);
  }

  return (
    <>
      {useIcon ? (
        <Tooltip
          title={
            createAndMergePullRequestLabel ? createAndMergePullRequestLabel : `Create and Merge Pull Request`
          }
        >
          <IconButton size="small" onClick={handleCreateAndApproveMergeClick}>
            <ChecklistRtlRoundedIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Button size="small" variant="text" onClick={handleCreateAndApproveMergeClick}>
          {createAndMergePullRequestLabel ? createAndMergePullRequestLabel : `Create and Merge Pull Request`}
        </Button>
      )}

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={progressShow}>
        <CircularProgress color="inherit" />

        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={snackShow}
          autoHideDuration={5000}
          onClose={handleSnackClose}
        >
          <Alert severity={snackSuccess ? `success` : `error`} sx={{ width: '100%' }}>
            {snackMessage}
          </Alert>
        </Snackbar>
      </Backdrop>
    </>
  );
}

export default CreatePullRequest;
