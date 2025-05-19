/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {
    let token
    beforeEach(() => {
        cy.token('fulano@qa.com', 'teste').then(tkn => { 
          token = tkn })
    });

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response => {
      return contrato.validateAsync(response.body)
    })
  });

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'
        }).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.have.property('quantidade');
        });
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    let email = `email${Math.floor(Math.random() * 100000000)}@teste.com`
    let nome = `nome ${Math.floor(Math.random() * 100000000)}`
      cy.request({
        method: 'POST',
        url: 'usuarios',
        headers: { authorization: token },
        failOnStatusCode: false,
        body: {
          nome: nome,
          email: email,
          password: 'teste123',
          administrador: 'true'
          }        
        }).then((response) => {
          expect(response.status).to.equal(201);
          expect(response.body.message).to.equal('Cadastro realizado com sucesso');
          expect(response.body).to.have.property('_id');
        });
  });

  it('Deve validar um usuário com email inválido', () => {
    let nome = `nome ${Math.floor(Math.random() * 100000000)}`
      cy.request({
        method: 'POST',
        url: 'usuarios',
        headers: { authorization: token },
        failOnStatusCode: false,
        body: {
          nome: nome,
          email: 'emailerrado',
          password: 'teste123',
          administrador: 'true'
          }        
        }).then((response) => {
          expect(response.status).to.equal(400);
          expect(response.body).to.have.property('email');
          expect(response.body.email).to.contain('email deve ser um email válido');
        }); 
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    let email = `email${Math.floor(Math.random() * 100000000)}@teste.com`
    let nome = `nome ${Math.floor(Math.random() * 100000000)}`
    
    cy.cadastrarUsuario(token, nome, email, 'teste123', 'true')
      .then(response => {
      let id = response.body._id

      cy.request({
        method: 'PUT', 
        url: `usuarios/${id}`,
        headers: {authorization: token}, 
        body: {
          nome: nome,
          email: email,
          password: 'teste123',
          administrador: 'true'
        }
        }).then(response => {
        expect(response.body.message).to.equal('Registro alterado com sucesso')
        })
        })
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    let email = `email${Math.floor(Math.random() * 100000000)}@teste.com`
    let nome = `nome ${Math.floor(Math.random() * 100000000)}` 
    
    cy.cadastrarUsuario(token, nome, email, 'teste123', 'true')
      .then(response => {
      let id = response.body._id

      cy.request({
        method: 'DELETE', 
        url: `usuarios/${id}`,
        headers: {authorization: token}
        }).then(response => {
          expect(response.body.message).to.equal('Registro excluído com sucesso')
          expect(response.status).to.equal(200)
        })
        })
  });
});