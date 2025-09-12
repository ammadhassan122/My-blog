import React , {useId} from 'react'

const Input = React.forwardRef(function Input({
    label,
    type="text",
    className="",
    ...props

},ref){
    const id = useId();
    return (
        <div className='w-full'>
            {label && <label className='text-white'
             htmlFor='{id}'>{label}</label>    
        }
        <input type={   type} className={`border border-gray-300 bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${className}`}
        {...props}
        ref={ref}
        id={id}        
        />
        </div>
    )
})

export default Input