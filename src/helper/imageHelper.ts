import { accessSync, mkdirSync, unlink } from "fs";
import sharp from "sharp";
import path from "path"

export let sizes: { [index: string]: number[] } = {
    "tiny": [20, 20],
    "small": [50, 50],
    "medium": [100, 100],
    "large": [500, 500]
};

export default {

    /**
     * Exposed to the views
     * @param path Path to the original image
     * @param size Image size we want to fetch
     */
    getImage(file: string, size?: string) {
        let filePath = "/assets/img/";
        let url = "/img/";

        if (!size || size === "original") {
            return url + file;
        }

        let resizeData = {
            width: sizes[size][0],
            height: sizes[size][1],
            fit: "contain"
        };

        filePath += size;
        url += size + "/";

        try {
            accessSync(path.join(__dirname, "../", filePath, file));

            return url + file;
        } catch (err) { }

        try {

            mkdirSync(path.join(__dirname, "../", filePath))
        } catch (error) {
            if (error.code !== "EEXIST") {
                throw error;
            }
        }

        sharp(path.join(__dirname, "../assets/img", file))
            .resize(resizeData.width, resizeData.height)
            .toFile(path.join(__dirname, "../", filePath, file));

        return url + file;
    },

    removeImages(fileName: string) {
        // Unlink main image
        unlink(path.join(__dirname, "../assets/img", fileName), (err) => {
            if (err && err.code !== "ENOENT") throw err
        });

        // Unlink sizes
        Object.keys(sizes).forEach(size => {
            unlink(path.join(__dirname, "../assets/img", size, fileName), err => {
                if (err && err.code !== "ENOENT") throw err;
            })
        });
    }
}