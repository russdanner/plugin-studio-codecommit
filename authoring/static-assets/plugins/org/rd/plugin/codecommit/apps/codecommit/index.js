const React = craftercms.libs.React;
const { Tooltip, Backdrop, CircularProgress, Alert } = craftercms.libs.MaterialUI;
const IconButton = craftercms.libs.MaterialUI.IconButton && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.IconButton, 'default') ? craftercms.libs.MaterialUI.IconButton['default'] : craftercms.libs.MaterialUI.IconButton;
const Button = craftercms.libs.MaterialUI.Button && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Button, 'default') ? craftercms.libs.MaterialUI.Button['default'] : craftercms.libs.MaterialUI.Button;
const { useSelector } = craftercms.libs.ReactRedux;
const ChecklistRtlRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/ChecklistRtlRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ChecklistRtlRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ChecklistRtlRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ChecklistRtlRounded');
const Snackbar = craftercms.libs.MaterialUI.Snackbar && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Snackbar, 'default') ? craftercms.libs.MaterialUI.Snackbar['default'] : craftercms.libs.MaterialUI.Snackbar;
const { post } = craftercms.utils.ajax;

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function useActiveSiteId() {
  return useSelector((state) => state.sites.active);
}

function CreatePullRequest(props) {
    var useIcon = props.useIcon, repoName = props.repoName, sourceBranch = props.sourceBranch, targetBranch = props.targetBranch, prTitle = props.prTitle, 
    // createMergeRequestLabel,
    createAndMergePullRequestLabel = props.createAndMergePullRequestLabel
    // approveMergeRequestLabel,
    // rejectMergeRequestLabel,
    // listMergeRequestsLabel
    ;
    var siteId = useActiveSiteId();
    var _a = React.useState(''), snackMessage = _a[0], setSnackMessage = _a[1];
    var _b = React.useState(true), snackSuccess = _b[0], setSnackSuccess = _b[1];
    var _c = React.useState(false), snackShow = _c[0], setSnackShow = _c[1];
    var _d = React.useState(false), progressShow = _d[0], setProgressShow = _d[1];
    var PLUGIN_SERVICE_BASE = '/studio/api/2/plugin/script/plugins/org/rd/plugin/codecommit/codecommit/devcontentops';
    var handleCreateAndApproveMergeClick = function (event) {
        setProgressShow(true);
        var serviceUrl = "".concat(PLUGIN_SERVICE_BASE, "/create-and-merge-pull-request.json?siteId=").concat(siteId, "&repoName=").concat(repoName, "&title=").concat(prTitle, "&sourceBranch=").concat(sourceBranch, "&targetBranch=").concat(targetBranch);
        post(serviceUrl).subscribe({
            next: function (response) {
                // sort our our attachments vs everything else
                response.response.result;
                setSnackMessage("".concat(createAndMergePullRequestLabel ? createAndMergePullRequestLabel : 'Pull', " completed successfully."));
                setSnackSuccess(true);
                setSnackShow(true);
            },
            error: function (response) {
                setSnackMessage("".concat(createAndMergePullRequestLabel ? createAndMergePullRequestLabel : 'Pull', " failed."));
                setSnackSuccess(false);
                setSnackShow(true);
            }
        });
    };
    function handleSnackClose(event, reason) {
        setProgressShow(false);
        setSnackShow(false);
    }
    return (React.createElement(React.Fragment, null,
        useIcon ? (React.createElement(Tooltip, { title: createAndMergePullRequestLabel ? createAndMergePullRequestLabel : "Create and Merge Pull Request" },
            React.createElement(IconButton, { size: "small", onClick: handleCreateAndApproveMergeClick },
                React.createElement(ChecklistRtlRoundedIcon, null)))) : (React.createElement(Button, { size: "small", variant: "text", onClick: handleCreateAndApproveMergeClick }, createAndMergePullRequestLabel ? createAndMergePullRequestLabel : "Create and Merge Pull Request")),
        React.createElement(Backdrop, { sx: { color: '#fff', zIndex: function (theme) { return theme.zIndex.drawer + 1; } }, open: progressShow },
            React.createElement(CircularProgress, { color: "inherit" }),
            React.createElement(Snackbar, { anchorOrigin: { vertical: 'top', horizontal: 'center' }, open: snackShow, autoHideDuration: 5000, onClose: handleSnackClose },
                React.createElement(Alert, { severity: snackSuccess ? "success" : "error", sx: { width: '100%' } }, snackMessage)))));
}

var plugin = {
    locales: undefined,
    scripts: undefined,
    stylesheets: undefined,
    id: 'org.rd.plugin.codecommit',
    widgets: {
        'org.rd.plugin.codecommit.CreatePullRequest': CreatePullRequest
    }
};

export { CreatePullRequest, plugin as default };
