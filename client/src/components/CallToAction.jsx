import { Button } from "flowbite-react";

export default function CallToAction() {
    return (
        <div className="flex flex-col sm:flex-row p-3 border border-orange-400  justify-center items-center rounded-bl-3xl rounded-tr-3xl text-center">
             <div className="p-7 flex-1">
                <img src="https://www.patterns.dev/img/reactjs/react-logo@3x.svg"/>
            </div>
            <div className="flex-1 justify-center flex flex-col">
                <h2 className="text-2xl">What to learn more about React.js</h2>
                <p className="text-zinc-600 my-2">
                    Cheackout these resoures with articles.
                </p>
                <Button gradientDuoTone='pinkToOrange' className="rounded-tr-xl rounded-br-none">
                    <a href="https://legacy.reactjs.org/docs/getting-started.html" target="_blank" rel="noopener noreferrer">Learn More </a>
                </Button>
            </div>
        </div>
    )
};