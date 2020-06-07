import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';
import api from '../../services/api';

import Dropzone from '../../components/Dropzone';

import './styles.css';

import logo from '../../assets/logo.svg';

//sempre que for criado um array ou objeto, é preciso informar, manualmente, o tipo da variável

interface Item {
    id: number;
    titulo: string;
    imagem_url: string;
}

interface IBGEUFResponse{
    sigla: string;
}

interface IBGECidadeResponse{
    nome: string;
}

const CreatePonto = () => {
    const [itens,setItens] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cidades, setCidades] = useState<string[]>([]);

    const [inicialPosition, setInicialPosition] = useState<[number,number]>([0,0]);

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        whatsapp: '',
    });

    const [selectedUf, setSelectedUf] = useState('0');  
    const [selectedCidade, setSelectedCidade] = useState('0');
    const [selectedItens, setSelectedItens] = useState<number[]>([]);
    const [selectedPosition, setSelectedPosition] = useState<[number,number]>([0,0]);
    const [selectedFile, setSelectedFile] = useState<File>();

    const history = useHistory();
    
    useEffect( () => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;

            setInicialPosition([latitude, longitude]);
        })
    }, []);

    
    useEffect(() => {
        api.get('item').then(response => {
            setItens(response.data);
        })
    }, []);

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(response => {
            const siglaUF = response.data.map(uf => uf.sigla);

            setUfs(siglaUF);
        });
    }, []);

    useEffect(() => {
        //carregar as cidades sempre que a UF mudar
        if (selectedUf === '0'){
            return;
        }

        axios
            .get<IBGECidadeResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
            .then(response => {
                const cidadeNomes = response.data.map(cidade => cidade.nome);

                setCidades(cidadeNomes);
        });
    }, [selectedUf]);

    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;

        setSelectedUf(uf);
    }

    function handleSelectCidade(event: ChangeEvent<HTMLSelectElement>) {
        const cidade = event.target.value;

        setSelectedCidade(cidade);
    }

    function handleMapClick(event: LeafletMouseEvent) {
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng,
        ])
        
    }

    function handleInputChance(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value })
    }

    function handleSelectItem(id: number) {
        const alreadySelected = selectedItens.findIndex(item => item === id);

        if (alreadySelected >= 0){
            const filteredItens = selectedItens.filter(item => item !== id);

            setSelectedItens(filteredItens);

        }else {
            setSelectedItens([ ...selectedItens, id ]);
        }
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { nome, email, whatsapp } = formData;
        const uf = selectedUf;
        const cidade =  selectedCidade;
        const [latitude, longitude] = selectedPosition;
        const item = selectedItens;

        const data = new FormData();

        data.append('nome',nome);
        data.append('email',email);
        data.append('whatsapp',whatsapp);
        data.append('cidade',cidade);
        data.append('uf',uf);
        data.append('latitude',String(latitude));
        data.append('longitude',String(longitude));
        data.append('item',item.join(','));
        
        if (selectedFile) {
            data.append('imagem', selectedFile);
        }

        await api.post('ponto', data);

        alert('Ponto de coleta criado!');

        history.push('/');
    }

    return (
        <div id="page-create-ponto">
            <header>
                <img src={logo} alt="Ecoleta"/>

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>Cadastro do <br /> Ponto de Coleta</h1>

                <Dropzone onFileUploaded={setSelectedFile} />

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="nome">Nome da entidade</label>
                        <input 
                            type="text"
                            name="nome"
                            id="nome"
                            onChange={handleInputChance}
                        />
                    </div>
                
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleInputChance}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input 
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                onChange={handleInputChance}
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o Endereço no mapa</span>
                    </legend>

                    <Map center={inicialPosition} zoom={15} onClick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    <Marker position={selectedPosition} />
                    
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado</label>
                            <select 
                                name="uf" 
                                id="uf" 
                                value={selectedUf} 
                                onChange={handleSelectUf}
                            >
                                <option value="0">Selecione um Estado</option>
                                {ufs.map(uf => (
                                    <option key= {uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="cidade">Cidade</label>
                            <select 
                                name="cidade" 
                                id="cidade"
                                value={selectedCidade}
                                onChange={handleSelectCidade}
                            >
                                <option value="0">Selecione uma Cidade</option>
                                {cidades.map(cidade => (
                                    <option key= {cidade} value={cidade}>{cidade}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mais ítens abaixo</span>
                    </legend>

                    <ul className="item-grid">
                        {itens.map(item => (
                            <li 
                                key={item.id} 
                                onClick={() => handleSelectItem(item.id)}
                                className={selectedItens.includes(item.id) ? 'selected' : ''}
                            >
                                <img src={item.imagem_url} alt={item.titulo} />
                                <span>{item.titulo}</span>
                            </li>
                        ))}
                        
                        
                    </ul> 
                </fieldset>  


                <button type="submit">
                    Cadastrar ponto de coleta
                </button>
            </form>
        </div>
    );
};

export default CreatePonto;