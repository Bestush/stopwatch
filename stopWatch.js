class Component {
    notify() {
        this.callback();
    }

    register(callback) {
        this.callback = callback;
    }

    render() {}
}

class Renderer {
    constructor(component, destination) {
        this.render = component.render.bind(component);
        this.destination = destination;

        component.register(() => {
            return this.listen();
        });

        this.listen();
    }

    listen() {
        this.destination.innerHTML = '';
        this.destination.appendChild(this.render());
    }
}


class StopWatch extends Component {
    constructor() {
        super();
        this.timer = 0;
        this.msec = 0;
        this.sec = 0;
        this.min = 0;
        this.hour = 0;
        this.something = 0;
        this.onOff = 0;
        this.time = "00:00:00:00";
    }


    start() {
        this.onOff = 1;
        setTimeout(() => {
            if (this.onOff) {
                this.timer++;
                this.msec = this.timer % 100;
                this.sec = Math.floor(this.timer / 100);
                this.min = Math.floor(this.timer / 6000);
                this.hour = Math.floor(this.timer / 3600000);

                if (this.msec < 10) {
                    this.msec = "0" + this.msec;
                }
                if (this.sec >= 60) {
                    this.sec = this.sec % 60;
                }
                if (this.sec < 10) {
                    this.sec = "0" + this.sec;
                }
                if (this.min < 10) {
                    this.min = "0" + this.min;
                }
                if (this.hour < 10) {
                    this.hour = "0" + this.hour;
                }
                this.time = `${this.hour}:${this.min}:${this.sec}:${this.msec}`;
                this.start();
                this.notify();
            }
        }, 10);

    }

    stop() {
        if (this.onOff)
            this.onOff = 0;
    }
    reset() {
        if (!this.onOff) {
            this.onOff = 0;
            this.time = "00:00:00";
        }
    }
    render() {
        return $('<div>')
            .append($('<h1>')
                .html(`${this.time}`)
            ).append([
                $('<button>').addClass('start').html('Start').on('click', () => {
                    this.start(0);
                    console.log(this.onOff);
                }),
                $('<button>').addClass('pause').html('Pause').on('click', () => {
                    this.stop();
                    this.notify();


                }),
                $('<button>').addClass('reset').html('Reset').on('click', () => {
                    this.reset();

                    this.notify();
                })
            ])[0];

    }

}