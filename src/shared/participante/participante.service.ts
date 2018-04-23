import { Injectable } from "@angular/core";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { Participante } from "./participante";
import { Config } from "../../config/config";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';


@Injectable()
export class ParticipanteService {
    constructor(
        private transfer: FileTransfer
    ) { }

    uploadFile(participante: Participante) {
        return new Promise((resolve) => {
            const fileTransfer: FileTransferObject = this.transfer.create();

            let options: FileUploadOptions = {
                fileKey: 'imagem',
                fileName: participante.nome,
                chunkedMode: false,
                mimeType: "image/jpeg",
                headers: {},
                params: {
                    "nome": participante.nome,
                    "sexo": participante.sexo,
                    "ext": "JPEG"
                }
            }

            fileTransfer.upload(participante.emoji, Config.apiUrl, options)
                .then((data) => {
                    resolve(data);
                }, (err) => {
                    console.log("fileTransfer.upload: ");
                    console.dir(err);
                });
        });
    }
}