import './style.css'

export default function Login(){



    return (
       
            <div className='formControl'>
                <form onSubmit="">
                    <h1>Se connecter</h1>
                    <input 
                        type="email"
                        placeholder='Entrez votre email'
                        value=""
                    />
                    <input 
                        type='password'
                        placeholder='Entrez votre mot de passe'
                    />
                    <button type='submit'>Se connecter</button>
                </form>
            </div>

    );
}