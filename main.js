let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = () => {
    getRepos();
};

function getRepos() {
    if (theInput.value === "") {
        reposData.innerHTML = `<span><i class="fa-solid fa-warning"></i> Please Write Github Username.</span>`;
    } else {
        fetch(`https://api.github.com/users/${theInput.value}/repos`)
        .then((res) => res.json())
        .then((repos) => {
            reposData.innerHTML = "";
            repos.forEach(repo => {
                let mainDiv = document.createElement("div");
                let repoName = document.createTextNode(repo.name);
                mainDiv.appendChild(repoName);
                let theUrl = document.createElement("a");
                let theUrlText = document.createTextNode("Vist");
                theUrl.appendChild(theUrlText);
                theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
                theUrl.setAttribute("target", "_blank");
                mainDiv.appendChild(theUrl);
                let starsSpan = document.createElement("span");
                starsSpan.className = "star";
                let iconStart = document.createElement("i");
                iconStart.className = "fa-solid fa-star";
                let startText = document.createTextNode(` ${repo.stargazers_count}`);
                starsSpan.appendChild(iconStart);
                starsSpan.appendChild(startText);
                mainDiv.appendChild(starsSpan);
                mainDiv.className = "repoBox";
                reposData.appendChild(mainDiv);      
            });
        }); 
    };
};
