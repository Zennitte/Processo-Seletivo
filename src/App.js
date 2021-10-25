import './App.css';
import { Component } from 'react';

class GitUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listaRepo: [],
      nomeRepo: ''
    }
  }

  buscarRepo = (elemento) => {
    elemento.preventDefault();

    console.log("Buscando repositório")

    fetch(`https://api.github.com/users/${this.state.nomeRepo}/repos?per_page=10&sort=author-date-desc`)

      .then(resposta => resposta.json())

      .then(lista => this.setState({ listaRepo: lista }))

      .catch(erro => console.log(erro))
  }

  updateName = async (nome) => {
    await this.setState({ nomeRepo: nome.target.value })
    console.log(this.state.nomeRepo)
  }

  render() {
    return (
      <div>
        <main>
          <section>
            <h2 className = "titulo">Busque Usuários Do Github</h2>
            <form onSubmit={this.buscarRepo}>
              <input type="text" value={this.state.nomeRepo} onChange={this.updateName} placeholder="Úsuario do Github" className = "texto"/>
              <button className= "btn" type="submit" onClick={this.buscarRepo}>Buscar</button>
            </form>
          </section>
          <section>
            <table>
              <thead className = "tabela-th">
                <th>Id</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Data De Criação</th>
                <th>Tamanho</th>
              </thead>
              <tbody className = "tabela-tr">
                {this.state.listaRepo.map((repo) => {
                  return (
                    <tr key={repo.id}>
                      <td>{repo.id}</td>
                      <td>{repo.name}</td>
                      <td>{repo.description}</td>
                      <td>{repo.created_at}</td>
                      <td>{repo.size}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    )
  }
}

export default GitUser;
