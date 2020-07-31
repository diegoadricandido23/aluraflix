import config from '../config';

const URL_CATEGORIES = `${config.URL_BACKEND_TOP}/videos`;

function create(objetoVideo) {
    return fetch(`${URL_CATEGORIES}?_embed=videos`, {
        method: 'POST', 
        headers: {
            'Contet-type' : 'application/json',
        },
        body: JSON.stringify(objetoVideo),
    })
    
        .then(async (respostaDoServidor) => {

            if(respostaDoServidor.ok) {
                const resposta = await respostaDoServidor.json();
                return resposta;
            }
            
            throw new Error('Não Foi Possível conectar ao Servidor');
    });
}

export default {
    create,
};