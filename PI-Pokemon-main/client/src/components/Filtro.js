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
        <label style={{'color':'white'}}>{label}</label>
        <select style={{
            'borderRadius':'14px'
        }} onChange={onChange} name={name}>
            {opciones.map(o => (
                <option key={flag ? o.id : o } value={flag ? o.name :o}>{!flag ? props[o] : o.name === 'seleccionar' ? `--${o.name}--`: o.name}</option>
            ))}
        </select>
        </>
    )
}

export default Filtro