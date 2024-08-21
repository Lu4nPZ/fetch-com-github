const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
        this.userProfile.innerHTML = `
                                        <div class="info">
                                            <img src="${user.avatarUrl}" alt="Foto de perfil do usuário"/>
                                            <div class="data">
                                                <h1>${user.name ?? 'Não possui nome cadastrado'}</h1>
                                                <p>${user.userName}</p>
                                                <p>${user.bio ?? 'Não possui bio cadastrada'}</p>
                                            </div>
                                        </div>
                                        <div class="seguidores">
                                            <p>👥Seguidores: ${user.followers}</p>
                                            <p>👥Seguindo: ${user.following}</p>
                                        </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li>
                                                                    <a href="${repo.html_url}" target="_blanck">${repo.name}
                                                                    <div class="info-repo">
                                                                    <span class="info-repo-itens">🍴${repo.forks}</span>
                                                                    <span class="info-repo-itens">⭐${repo.stargazers_count}</span>
                                                                    <span class="info-repo-itens">👀${repo.watchers}</span>
                                                                    <span class="info-repo-itens">💻${repo.language}</span>
                                                                    </div>
                                                                    </a></li>`)

        if(user.repositories.length > 0){
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositorios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`
        }

        let eventsItens = ''
        user.events.forEach(event => {
            if (event.type === 'PushEvent') {
                if (event.payload.commits && event.payload.commits.length > 0) {
                    eventsItens += `<li><strong>${event.repo.name}</strong> - ${event.payload.commits[0].message}</li>`;
                } else {
                    eventsItens += `<li><strong>${event.repo.name}</strong> - No commit message</li>`;
                }
            } else if (event.type === 'CreateEvent') {
                eventsItens += `<li><strong>${event.repo.name}</strong> - Sem mensagem de commit</li>`;
            }
        });
        
        if(user.events.length > 0){
            this.userProfile.innerHTML += `
                                            <div class="events">
                                                <h2>Eventos</h2>
                                                <ul>${eventsItens}</ul>
                                            </div>`
        }
    },
    renderNotFound(){[
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    ]}
}

export {screen}