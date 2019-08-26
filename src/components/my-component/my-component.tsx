import { Component, h, Element } from '@stencil/core';
import {Engine, HemisphericLight, Mesh, Scene} from '@babylonjs/core';
import {Vector3} from '@babylonjs/core';
import {FreeCamera} from '@babylonjs/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: false
})
export class MyComponent {

  @Element() private element: HTMLElement;

  componentDidLoad() {

    const canvas = this.element.querySelector("#renderCanvas") as HTMLCanvasElement;
    const engine = new Engine(canvas);
    var scene = new Scene(engine);
    var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
    camera.setTarget(Vector3.Zero());

    camera.attachControl(canvas, true);

    var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    var sphere = Mesh.CreateSphere("sphere1", 16, 2, scene);
    sphere.position.y = 2;

    Mesh.CreateGround("ground1", 6, 6, 2, scene);

    engine.runRenderLoop(() => {
      scene.render();
    });
  }

  render() {
    return <div>
      <canvas id="renderCanvas" width="500" height="500"></canvas>
    </div>;
  }
}
