

const Filtro = ({label, name, onChange, ...props}) => {
    const opciones = []
    let flag = false;
    if(props.hasOwnProperty('types')){
        flag = true;
        opciones.push({id: 0, name: 'seleccionar'})

        for(let prop in props.types){
            opciones.push(props.types[prop])
        }
    }else{
        for(let prop in props){
            opciones.push(prop)
        }
    }
    return ( 
        <>
        <label>{label}</label>
        <select onChange={onChange} name={name}>
            {opciones.map(o => (
                <option key={flag ? o.id : o } value={flag ? o.name :o}>{flag ? o.name : props[o]}</option>
            ))}
        </select>
        </>
    )
}

export default Filtro