import * as THREE from "three";
import { ARButtonSessionInit } from "three/examples/jsm/Addons.js";
import GifLoader from "three-gif-loader";

export function createThreeManager(
  fileURL: string,
  extension: string,
  aspect: number,
  handleHitTestSourceDetected: () => void,
) {
  const SESSION_OPTIONS: ARButtonSessionInit = {
    domOverlay: { root: document.body },
    requiredFeatures: ["hit-test"],
    optionalFeatures: ["dom-overlay"],
  };

  let session: XRSession | null = null;
  let hitTestSource: XRHitTestSource | null = null;
  let hitTestSourceRequested = false;
  let clickable = true;
  let manualReticleVisible = true;

  /* Scene */
  const scene = new THREE.Scene();

  /* Camera */
  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    20,
  );
  camera.position.set(0, 1.6, 0);
  scene.add(camera);

  /* Light */
  const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  ambient.position.set(0.5, 1, 0.25);
  scene.add(ambient);

  /* Renderer */
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;

  /* Reticle */
  const reticle = new THREE.Mesh(
    new THREE.RingGeometry(0.0375, 0.05, 32).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial(),
  );
  reticle.matrixAutoUpdate = false;
  reticle.visible = false;
  scene.add(reticle);

  // プレーンを作成

  const pGeometry = new THREE.PlaneGeometry(0.15, 0.15 / aspect);
  pGeometry.translate(0, 0.1, 0);

  // 使用例
  const texture = loadTexture(extension);
  if (!texture) {
    return;
  }

  texture.colorSpace = THREE.SRGBColorSpace;
  // マテリアルにテクスチャーを設定
  const imageMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 1.0,
    side: THREE.DoubleSide, // 表裏の表示設定
    depthWrite: false, // デプスバッファへの書き込み可否
  });
  const mesh = new THREE.Mesh(pGeometry, imageMaterial);
  scene.add(mesh);
  mesh.visible = false;

  function loadTexture(extension: string) {
    let loader;

    // 拡張子に応じてローダーを選択
    switch (extension) {
      case "png":
      case "jpg":
      case "jpeg":
      case "bmp":
      case "tga":
        loader = new THREE.TextureLoader();
        break;
      case "gif":
        loader = new GifLoader();
        break;
      default:
        console.error("Unsupported file extension:", extension);
        return null;
    }

    // テクスチャを読み込む
    const texture = loader.load(
      fileURL,
      function (reader) {
        // 読み込み完了後の処理
        console.log("Texture loaded successfully");
      },
      function (xhr) {
        // 読み込み進捗の処理
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      function (error) {
        // エラー処理
        console.error("An error occurred while loading the texture", error);
      },
    );

    return texture;
  }

  // フレームごとに実行されるアニメーション
  animate();

  function animate() {
    renderer.setAnimationLoop(render);
  }

  async function render(timestamp: number, frame: XRFrame) {
    if (frame) {
      const referenceSpace = renderer.xr.getReferenceSpace();
      if (!referenceSpace) {
        console.log("sorry cannot get renderer referenceSpace");
        return;
      }

      const session = renderer.xr.getSession();
      if (!session) {
        console.log("sorry cannot get renderer session");
        return;
      }

      if (hitTestSourceRequested === false) {
        session.requestReferenceSpace("viewer").then((referenceSpace) => {
          session.requestHitTestSource!({ space: referenceSpace })!.then(
            function (source) {
              hitTestSource = source;
            },
          );
        });

        session.addEventListener("end", function () {
          hitTestSourceRequested = false;
          hitTestSource = null;
        });

        hitTestSourceRequested = true;
      }

      if (hitTestSource) {
        const hitTestResults = frame.getHitTestResults(hitTestSource);

        if (hitTestResults.length) {
          handleHitTestSourceDetected();
          const hit = hitTestResults[0];
          if (manualReticleVisible) {
            reticle.visible = true;
          }

          reticle.matrix.fromArray(
            hit.getPose(referenceSpace)!.transform.matrix,
          );
        } else {
          reticle.visible = false;
        }
      }
    }
    renderer.render(scene, camera);
  }

  function shrinkMesh() {
    const shrinkRate = 0.05;
    mesh.scale.x -= shrinkRate;
    mesh.scale.y -= shrinkRate;
    mesh.scale.z -= shrinkRate;

    // スケールが0以下にならないように制限
    if (mesh.scale.x < 0) mesh.scale.x = 0;
    if (mesh.scale.y < 0) mesh.scale.y = 0;
    if (mesh.scale.z < 0) mesh.scale.z = 0;

    clickable = false;
  }

  function enlargeMesh() {
    const expandRate = 0.05;
    mesh.scale.x += expandRate;
    mesh.scale.y += expandRate;
    mesh.scale.z += expandRate;

    clickable = false;
  }

  function rotateLeft() {
    mesh.rotation.y += 0.1;
    clickable = false;
  }

  function rotateRight() {
    mesh.rotation.y -= 0.1;
    clickable = false;
  }

  function toggleReticleVisible() {
    manualReticleVisible = !manualReticleVisible;
    reticle.visible = manualReticleVisible;
    clickable = false;
  }

  function onSelect() {
    if (!clickable) {
      clickable = true;
      return;
    }
    if (reticle.visible) {
      if (mesh.visible) {
        mesh.position.setFromMatrixPosition(reticle.matrix);
      } else {
        mesh.visible = true;
        mesh.position.setFromMatrixPosition(reticle.matrix);
      }
    }
  }

  async function startARSession() {
    if (navigator.xr) {
      session = await navigator.xr.requestSession(
        "immersive-ar",
        SESSION_OPTIONS,
      );
      renderer.xr.setReferenceSpaceType("local");
      renderer.xr.setSession(session);

      /* Controller */
      const controller = renderer.xr.getController(0);
      controller.addEventListener("select", onSelect);
      scene.add(controller);
    } else {
      throw new Error("WebXR is not supported");
    }
  }

  async function endARSession() {
    if (session) {
      await session.end();
    }
  }

  return {
    shrinkMesh,
    enlargeMesh,
    rotateLeft,
    rotateRight,
    startARSession,
    endARSession,
    toggleReticleVisible,
  };
}
