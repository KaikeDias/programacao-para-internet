import requests
import requests_cache
from bs4 import BeautifulSoup
from urllib.parse import urljoin

requests_cache.install_cache('data')

class Pagina:
    def __init__(self, url):
        self.url = url
        self.links = []
        self.resultados = []

paginasVisitadas = {}

def baixarPagina(url):
    response = requests.get(url, verify=False)
    soup = BeautifulSoup(response.content, "html.parser")
    return soup

def buscarPalavraChave(soup, palavra_chave):
    ocorrencias = soup.find_all(text=lambda text: text and palavra_chave.lower() in text.lower())
    
    resultados = [] 
    for ocorrencia in ocorrencias:
        texto = ocorrencia.strip()

        palavra_chave_inicio = texto.lower().find(palavra_chave.lower())

        contexto_inicio = max(0, palavra_chave_inicio - 20)
        contexto_fim = min(len(texto), palavra_chave_inicio + len(palavra_chave) + 20)
        contexto = texto[contexto_inicio:contexto_fim]

        resultado = f"{contexto}"
        resultados.append(resultado)
    
    return resultados

def getLinks(url,soup):
    links = []
    
    lista_tags_a = soup.find_all('a')
    for link in lista_tags_a:
        href = link.get('href')
        links.append(urljoin(url, href))
    
    return links
    
def search(url, palavra_chave, profundidade):
    soup = baixarPagina(url)
    resultados = buscarPalavraChave(soup, palavra_chave)
    links = getLinks(url, soup)

    pagina = Pagina(url)
    pagina.links = links
    pagina.resultados = resultados

    if url not in paginasVisitadas:
        paginasVisitadas[url] = pagina

    if profundidade > 0:
        for link in pagina.links:
            if link not in paginasVisitadas:
                search(link, palavra_chave, profundidade-1)

def main():
    url = 'http://127.0.0.1:5500/paginas-exemplo/omega-page.html'
    palavra_chave = 'coffee'
    profundidade = 2

    search(url, palavra_chave, profundidade)

    for url, pagina in paginasVisitadas.items():
        print('Pagina visitada: ', pagina.url)
        print('Ocorrencias da palavra chave: ', pagina.resultados)
        print('--------------------------------------------------------------------')


if __name__ == '__main__':
    main()

#Não consegui implentar a parte de ranqueamento.