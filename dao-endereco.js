import { randomUUID } from 'node:crypto'
import { sql } from './conectdb.js'

export class DaoEndereco {
    
    //cadastrar novo endereço
    async create(endereco) {
        const enderecoID = randomUUID()
        const { logradouro, descricao, cidade, estado, rota } = endereco
        await sql`insert into endereco values (${enderecoID},${logradouro},${descricao},${cidade},${estado},${rota}) `

    }

    //update novo endereço
    async update(enderecoID, endereco) {
        const { logradouro, descricao, cidade, estado, rota } = endereco
        await sql`update endereco set logradouro=${logradouro},descricao=${descricao},cidade=${cidade},estado=${estado},rota=${rota} where enderecoID = ${enderecoID}`
    }

    //Lista de enderecos sem filtro
    async ListDataEnderecos() {
        const enderecos = await sql`select * from endereco`;
        return enderecos;
    }

    //removendo algum endereço pelo id
    async remove(param) {
        await sql`delete from endereco where enderecoid = ${param}`;

    }

    async buscarEnderecoPorLagradouro(param) {
        let search;
        if (param) {
            search = await sql`select * from endereco where logradouro ilike ${'%' + param + '%'}`;
        } else {
            search = await sql`select * from endereco`;
        }
        return search;
    }

}