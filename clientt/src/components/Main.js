


import {useState,useRef} from 'react'

const Main = ()=>{

    const [type,setType] = useState('trivia')
    const [number,setNumber] = useState(1)
    const [message,setMessage] = useState('')
    const [language,setLanguage] = useState('')
    const  [text_value ,setText]=  useState('hello world')
    const [textLanguage, setTextLanguage] = useState(null)

    const audio = useRef()
    const updateLanguage =(e)=>{
        const msg = e.target.value
        console.log(msg)
        setLanguage(msg)
    }


    const updateText =(e)=>{
        setText(e.target.value)
    }  
    const updateInput = (flag,value )=>{
        switch(flag){
            case 0:
                setType(value)
                break
            case 1 :
                setNumber(value)
                break
        }
        console.log(number,type)
    }

    const handleNumber =(e)=>{
        console.log(number,type)
        const url = `http://localhost:8080/numbers?number=${number}&type=${type}`
        fetch(url).then(
            e=>{
                return e.text()
            }
        ).then(data=>{
            setMessage(data)
        })
    }


    const handlerJoke =(e)=>{
        const url = `http://localhost:8080/chuck`
        fetch(url).then(
            e=>{
                return e.text()
            }
        ).then(data=>{
            setMessage(data)
        })
    }

    const handlerDetect =(e)=>{
        const url = `http://localhost:8080/detectLanguage?text=${language}`
        fetch(url).then(
            e=>{
                console.log(e)
                return e.text()
            }
        ).then(data=>{
            //setMessage(data)
            setTextLanguage(JSON.parse(data))
            console.log(JSON.parse(data))
        })
    }
    
    const handlerRandomVoice=(e)=>{
        const url = `http://localhost:8080/voiceWeb?number=${number}&type=${type}`
        fetch(url).then(
            e=>{
                var reader =e.body.getReader()
                console.log(reader)
                return reader
                .read()
                .then((result) => {
                  return result;
                });
            }
        ).then(res=>{
            var blob = new Blob([res.value], { type: 'audio/mp3' });
            var url = window.URL.createObjectURL(blob)
            audio.current .pause()
            audio.current.src = url;
            audio.current.play();
        })

        
    }
    const handlerSetTextVoice=(e)=>{
        const url = `http://localhost:8080/voice?text=${text_value}`
        fetch(url).then(
            e=>{
                var reader =e.body.getReader()
                console.log(reader)
                return reader
                .read()
                .then((result) => {
                  return result;
                });
            }
        ).then(res=>{
            var blob = new Blob([res.value], { type: 'audio/mp3' });
            var url = window.URL.createObjectURL(blob)
            audio.current.pause()
            audio.current.src = url;
            audio.current.play();
        })
    }
    return(
    <div>
        <div>
            <button onClick ={handleNumber}>
                Numbers
            </button>
            <input defaultValue="trivia" onInput ={(e)=>{updateInput(0,e.target.value)}}/>
            <input defaultValue = "1" onInput ={(e)=>{updateInput(1,e.target.value)}}/>
        </div>
        <div>
            <button onClick ={handlerJoke}>
                Joke
            </button>
        </div>
        <div>
            <button onClick = {handlerRandomVoice}>
                RandomVoiceJoke
            </button>
        </div>
        <div>
            <button  onClick ={handlerDetect}>
                DetectLanguage
            </button>
            <input defaultValue = "insert text" onChange={updateLanguage}/>
        </div>

        <div>
            <button onClick={handlerSetTextVoice}>
               Voice Speak
            </button>
            <input onChange={updateText}/>
        </div>

        <div>
            <p>
                {message}
            </p>
        </div>
        <div>
            {textLanguage && textLanguage.map(el=>{
                return (<div>
                    
                        
                            <h1>Language {el.language} and Confidence {el.confidence}</h1>
                        
                    
                    </div>
                    )
            })}


        </div>
        <audio ref={audio}/>
    </div>)   
}

export default Main




