from pycep_correios import get_address_from_cep, WebService

cep = input('CEP: ')

address = get_address_from_cep(cep, webservice= WebService.APICEP)

print('Estado: ', address['uf'])
print('Cidade: ', address['cidade'])
print('Bairro: ', address['bairro'])
print('Logradouro: ', address['logradouro'])
print('Complemento: ', address['complemento'])
