# kevimmendes.github.io

O meu portfólio — site estático servido pelo GitHub Pages.

**Site no ar:** <https://kevimmendes.github.io/>

## Ficheiros

| Ficheiro | O que é |
|---|---|
| `index.html` | A página toda: hero, sobre, projetos e contactos |
| `style.css` | Estilos, com gradientes e animações de entrada |
| `script.js` | Menu, animações ao fazer scroll e o efeito de escrever |

## Tecnologias

HTML, CSS e JavaScript puros. Sem framework, sem build, sem dependências — o
que é committed é o que é servido.

Os ícones vêm do [Font Awesome](https://fontawesome.com/) por CDN, e as fontes
do Google Fonts. São as únicas coisas carregadas de fora.

## Correr localmente

Não há nada para compilar. Qualquer servidor estático serve:

```bash
python -m http.server 8000
```

Depois abre <http://localhost:8000>.

Abrir o `index.html` com duplo clique também funciona, mas o ideal é pelo
servidor, para não haver problemas com caminhos.

## Publicar

O `main` publica direto. Qualquer push para `main` republica o site.

O URL vem do próprio nome do repositório, `kevimmendes.github.io` — se o
repositório mudar de nome, o endereço muda com ele.

## Projectos

A secção "Projetos" do site está de momento vazia, à espera de haver
projetos ready para mostrar.
