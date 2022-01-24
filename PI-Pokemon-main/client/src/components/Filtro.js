import { forwardRef } from "react";

const Filtro = forwardRef((props, ref) => {
    const {label, name, onChange ,...rest} = props
    const opciones = []
    let flag = false;
    if(rest.hasOwnProperty('types')){
        flag = true;
        opciones.push({id: 0, name: 'All'})

        for(let prop in rest.types){
            opciones.push(rest.types[prop])
        }
    }else{
        for(let prop in rest){
            opciones.push(prop)
        }
    }

    return ( 
        <>
        <label style={{'color':'white'}}>{label}</label>
        <select style={{
            'borderRadius':'5px'
        }} onChange={onChange} name={name} ref={ref}>
            {opciones.map(o => (
                <option key={flag ? o.id : o } value={flag ? o.name :o}>{!flag ? rest[o] : o.name}</option>
            ))}
        </select>
        </>
    )
})

export default Filtro