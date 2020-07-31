import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm'

function CadastroCategoria() {
    
    const valoresIniciais = {
      nome: '',
      descricao: '',
      cor: '',
    }

    const [categorias, setCategorias] = useState([]);
    const { handleChange, values, clearForm } = useForm(valoresIniciais);

    useEffect(() => {
      const URL_TOP = 'https://devsoutinhoflix.herokuapp.com/categorias';
      //  window.location.hostname.includes('localhost') 
      //     ? 'http://localhost:8081/categorias'
      //     : 'https://devsoutinhoflix.herokuapp.com/categorias';
          fetch(URL_TOP)
            .then(async (respostaDoServidor) => {
              if(respostaDoServidor.ok) {
                const resposta = await respostaDoServidor.json();
                setCategorias(resposta);
                return;
              }
      
      }, []);
    });

    return (
      <PageDefault>
        <h1>Cadastro de Categoria: {values.ti}</h1>

          <form onSubmit={function handleSubmit(infosDoEvento) {
            infosDoEvento.preventDefault();
            setCategorias([
              // ... '3' pontinhos, sugere a mantes os dados na lista e adicionar o novo
              ...categorias,
              values
            ]);

            clearForm();
          }}>
        
         <FormField 
            label = "Nome da Categoria"
            type = "text"
            name = "nome"
            value = {values.nome}
            onChange={handleChange}/>

          <FormField
            label="Descrição"
            type="textarea" 
            value={values.descricao}
            name="descricao"
            onChange={handleChange} />
            
          <FormField 
              label = "Cor"
              type = "color"
              name = "cor"
              value = {values.cor}
              onChange={handleChange} />

          <Button>
            Cadastrar
          </Button>
              
        </form>

        {categorias.length === 0 && (
          <div>
            {
              'Loading...'
            }
          </div>
        )}
          
        <ul>
          {categorias.map((categoria) => {
            return (
              <li key={`${categoria.id}`}>
                {categoria.titulo}
              </li>
            )
          })}
        </ul>

        <Link to="/">
          Ir para home
        </Link>
      </PageDefault>
 )
  }

  export default CadastroCategoria;