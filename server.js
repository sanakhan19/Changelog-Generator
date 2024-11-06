const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;

app.use(express.static('public'));


function getGitLogs(callback) {
    exec('git log --pretty=format:%s --tags', (err, stdout) => {
        if (err) {
            console.error(`Error: ${err}`);
            return;
        }
        const commits = stdout.split('\n');
        callback(commits);
    });
}

function categorizeCommits(commits) {
    const changelog = {
        Features: [],
        BugFixes: [],
        Others: []
    };

    commits.forEach(commit => {
        if (commit.toLowerCase().includes('feat')) {
            changelog.Features.push(commit);
        } else if (commit.toLowerCase().includes('fix')) {
            changelog.BugFixes.push(commit);
        } else {
            changelog.Others.push(commit);
        }
    });

    return changelog;
}

app.get('/changelog', (req, res) => {
    getGitLogs((commits) => {
        const categorizedCommits = categorizeCommits(commits);
        res.json(categorizedCommits);
    });
});

app.listen(port, () => {
    console.log(`Changelog generator running at http://localhost:${port}`);
});
