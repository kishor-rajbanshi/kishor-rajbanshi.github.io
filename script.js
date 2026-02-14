const username = 'kishor-rajbanshi';
const timezone = "Asia/Kathmandu";

fetch(`https://api.github.com/users/${username}`)
    .then(r => r.json())
    .then(u => {
        avatar.src = u.avatar_url;
        document.getElementById('name').textContent = u.name;
        login.textContent = `@${u.login}`;
        bio.textContent = u.bio;
        view_github_profile.innerHTML = `<a href="${u.html_url}" target="_blank">View GitHub Profile</a>`;
        stats.textContent = `👥 ${u.followers} followers · ${u.following} following`;
        document.getElementById('location').textContent = `🌎 ${u.location}`;
        // email.textContent = `✉️ ${u.email}`;
        company.textContent = u.company;
        if (u.blog) {
            blog.innerHTML = `🔗: <a href="${u.blog}" target="_blank">${u.blog}</a>`;
        }
        if (u.twitter_username) {
            twitter.innerHTML = `X: <a href="https://x.com/${u.twitter_username}" target="_blank">@${u.twitter_username}</a>`;
        }
    });

const time = new Date().toLocaleTimeString("en-GB", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit"
});
document.getElementById('timezone').textContent = `🕓 ${time} (UTC +05:45)`;

fetch(`https://raw.githubusercontent.com/${username}/${username}/main/README.md`)
    .then(r => r.text())
    .then(md => {
        readme.innerHTML = marked.parse(md, { headerIds: false, mangle: false });
    })
    .catch(() => readme.textContent = 'Unable to load README');

fetch(`https://api.github.com/users/${username}/gists?per_page=10&sort=updated`)
    .then(r => r.json())
    .then(list => {
        if (!list.length) {
            const li = document.createElement('li');
            li.innerHTML = 'No public gists';
            gists.appendChild(li);
            return;
        }
        list.filter(r => !r.fork).forEach(r => {
            const li = document.createElement('li');
            li.style.marginBottom = '8px';
            li.innerHTML = `<a href="${r.html_url}" target="_blank">${Object.values(r.files)[0].filename}</a><br><small>${r.description}</small>`;
            gists.appendChild(li);
        });
    });

fetch(`https://api.github.com/users/${username}/repos?per_page=10&sort=updated`)
    .then(r => r.json())
    .then(list => {
        if (!list.length) {
            const li = document.createElement('li');
            li.innerHTML = 'No public repositories';
            repos.appendChild(li);
            return;
        }
        list.filter(r => !r.fork).forEach(r => {
            const li = document.createElement('li');
            li.style.marginBottom = '8px';
            li.innerHTML = `<a href="${r.html_url}" target="_blank">${r.name}</a><br><small>${r.description}</small>`;
            repos.appendChild(li);
        });
    });