import { useEffect, useState } from "react"

export default function Timer({setStop, questionNumber, addTimeTrigger, setAddTimeTrigger}) {
    const [timer, setTimer]=useState(30);

    useEffect(()=>{
        if(addTimeTrigger){
            setTimer(timer + 30);
            setAddTimeTrigger(false);
        }
    },[addTimeTrigger, setAddTimeTrigger, timer]);

    useEffect(()=>{
        if(timer === 0) return setStop(true);
        const interval = setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000);
        return() => clearInterval(interval);
    }, [setStop, timer]);

    useEffect(()=>{
        setTimer(30);
    }, [questionNumber])
  return timer;
}
