import { FC, useRef, useState } from "react";
import { ModelViewerScene } from "./ModelViewerScene";
import { Nullable, Scene as BabyScene, ArcRotateCamera } from "@babylonjs/core";
import { HexColorPicker } from "react-colorful";

export const OfflineModelViewer: FC = () => {
    // Babylon scene reference
    const sceneRef = useRef<Nullable<BabyScene>>(null);
    // Babylon arc rotation camera reference
    const cameraRef = useRef<ArcRotateCamera>(null);
    /**
     * Selected material for the color picker UI
     */
    const [selectedMaterialName, setSelectedMaterialName] = useState<
        string | null
    >(null);
    /**
     * Colors map
     */
    const [colorsMap] = useState<Map<string, string>>(new Map());
    return (
        <>
            {!!selectedMaterialName && (
                <HexColorPicker
                    color={
                        selectedMaterialName
                            ? colorsMap.get(selectedMaterialName)
                            : undefined
                    }
                    onChange={(color) => {
                        colorsMap.set(selectedMaterialName, color);
                    }}
                    style={{
                        position: "absolute",
                        top: "72px",
                        right: "24px",
                    }}
                />
            )}
            <ModelViewerScene
                cameraRef={cameraRef}
                modelFileName="plane.glb"
                onReadyObservable={(scene: any) => {
                    sceneRef.current = scene;
                }}
            />
        </>
    );
};
