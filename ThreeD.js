class ThreeD {
	constructor(){
		this.initCamera();
		this.initTextures();
		this.initScene();
		this.initRenderer();
		this.animate();
		config.onChange("height", ()=> {this.updateScale()});
		config.onChange("depth", ()=> {this.updateScale()});
	}

	initCamera(){
		this.camera = new THREE.PerspectiveCamera( 35, 1, 1, 600 );
		this.camera.position.z = 425;
	  	this.camera.position.y = 150;
	 	this.camera.lookAt(new THREE.Vector3());
	}

	initTextures(){
		// TODO: make a function that creates a texture and then adds LinearFilter
		this.edgeTexture = new THREE.Texture(edge);
	 	this.spineTexture = new THREE.Texture(spine);
	 	this.topTexture = new THREE.Texture(topp);
	 	this.bottomTexture = new THREE.Texture(bottom);
	 	this.frontTexture = new THREE.Texture(front);
	 	this.backTexture = new THREE.Texture(back);

		// allows for non-power of two textures
	 	this.edgeTexture.minFilter = THREE.LinearFilter;
	 	this.spineTexture.minFilter = THREE.LinearFilter;
	 	this.topTexture.minFilter = THREE.LinearFilter;
	 	this.bottomTexture.minFilter = THREE.LinearFilter;
	 	this.frontTexture.minFilter = THREE.LinearFilter;
	 	this.backTexture.minFilter = THREE.LinearFilter;
	}
	initScene(){
		this.geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );

		const materials = [
		  new THREE.MeshBasicMaterial({map: this.edgeTexture}),
		  new THREE.MeshBasicMaterial({map: this.spineTexture}),
		  new THREE.MeshBasicMaterial({map: this.topTexture}),
		  new THREE.MeshBasicMaterial({map: this.bottomTexture}),
		  new THREE.MeshBasicMaterial({map: this.frontTexture}),
		  new THREE.MeshBasicMaterial({map: this.backTexture})
		];

		this.bookBox = new THREE.Mesh( this.geometry, materials );
		this.updateScale();
		this.scene = new THREE.Scene();

		this.scene.add( this.bookBox );
	}

	updateScale(){
		this.bookBox.scale.set(width, config.height, config.depth);
	}

	initRenderer(){
		this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( upper.offsetHeight, upper.offsetHeight );
		upper.appendChild( this.renderer.domElement );
		this.renderer.domElement.style.margin = "0 auto";
	}

	animate(){
		// requestAnimationFrame does not respect existing class scope
		// so we need to force it with an explicitly scoped anonymous function
		requestAnimationFrame( ()=>this.animate());
	  	this.updateTextures();
		// this.bookBox.rotation.x += 0.01;
		this.bookBox.rotation.y += 0.01;
		this.renderer.render( this.scene, this.camera );
	}

	updateTextures(){
		this.frontTexture.needsUpdate = true;
	  	this.backTexture.needsUpdate = true;
	  	this.topTexture.needsUpdate = true;
	  	this.bottomTexture.needsUpdate = true;
	  	this.spineTexture.needsUpdate = true;
	  	this.edgeTexture.needsUpdate = true;
	}

	resetView(){
		this.bookBox.rotation.y = 0;
		this.updateTextures();
	}
}


