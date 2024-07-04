class Key
{
    key: string;
    isDown: boolean = false;
    timeDown: number = 0;
    timeUp: number = 0;
    downDuration: number = 0;

    private pressedCallback: Function;

    constructor (key: string)
    {
        this.key = key;
    }

    down (event: KeyboardEvent)
    {
        this.isDown = true;
        this.timeDown = event.timeStamp;
    }

    up (event: KeyboardEvent)
    {
        this.isDown = false;
        this.timeUp = event.timeStamp;
        this.downDuration = this.timeUp - this.timeDown;
    }

    update (now: number)
    {
        if (this.isDown)
        {
            this.downDuration = now - this.timeDown;

            if (this.pressedCallback)
            {
                this.pressedCallback(this);
            }
        }
    }

    pressed (callback: Function)
    {
        this.pressedCallback = callback;
    }
}

const keys = new Map<string, Key>(
    [
        [ 'ArrowLeft', new Key('ArrowLeft') ],
        [ 'ArrowRight', new Key('ArrowRight') ],
        [ 'ArrowUp', new Key('ArrowUp') ],
        [ 'ArrowDown', new Key('ArrowDown') ]
    ]
);

export const ArrowLeft = keys.get('ArrowLeft');
export const ArrowRight = keys.get('ArrowRight');
export const ArrowUp = keys.get('ArrowUp');
export const ArrowDown = keys.get('ArrowDown');

const keyDownHandler = (event: KeyboardEvent) => {

    keys.forEach(key => {
            
        if (event.key === key.key)
        {
            key.down(event);
        }

    });

}

const keyUpHandler = (event: KeyboardEvent) => {

    keys.forEach(key => {
            
        if (event.key === key.key)
        {
            key.up(event);
        }

    });

}

const updateHandler = (now: number) => {

    keys.forEach(key => {
            
        key.update(now);

    });

    window.requestAnimationFrame(updateHandler);

}

let updateKey = 0;

export function Start ()
{
    window.addEventListener('keydown', keyDownHandler);

    window.addEventListener('keyup', keyUpHandler);

    updateKey = window.requestAnimationFrame(updateHandler);
}

export function Stop ()
{
    window.removeEventListener('keydown', keyDownHandler);

    window.removeEventListener('keyup', keyUpHandler);

    window.cancelAnimationFrame(updateKey);
}

if (window)
{
    Start();
}
