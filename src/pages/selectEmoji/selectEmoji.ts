import { Component } from '@angular/core';
import { Participante } from "../../shared/participante/participante";
import { ParticipanteService } from "../../shared/participante/participante.service";
import { NavController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { AlertController, LoadingController } from 'ionic-angular';


@Component({
    selector: 'selectEmoji',
    animations: [
        trigger(
            'enterAnimation', [
                transition(':enter', [
                    style({ transform: 'translateY(100%)', opacity: 0 }),
                    animate('200ms', style({ transform: 'translateY(0)', opacity: 1 }))
                ]),
                transition(':leave', [
                    style({ transform: 'translateY(0)', opacity: 1 }),
                    animate('200ms', style({ transform: 'translateY(100%)', opacity: 0 }))
                ])
            ]
        )
    ],
    templateUrl: 'selectEmoji.html'
})
export class SelectEmoji {
    myEmoji: string = '';
    participante: Participante;
    participanteForm: FormGroup;
    constructor(
        private imagePicker: ImagePicker,
        private formBuilder: FormBuilder,
        private participanteService: ParticipanteService,
        public navCtrl: NavController,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController
    ) {
        this.participanteForm = this.formBuilder.group({
            nome: ['', Validators.compose([Validators.maxLength(16), Validators.minLength(2), Validators.pattern('[a-zA-ZÀ-ú ]*'), Validators.required])],
            sexo: ['', Validators.required],
        });
        this.participante = new Participante();
        this.openGallery();
    }

    private openGallery() {
        this.imagePicker.hasReadPermission().then((result) => {
            if (!result) {
                this.imagePicker.requestReadPermission();
            } else {
                this.imagePicker.getPictures({ maximumImagesCount: 1, outputType: 0 }).then((image) => {
                    if (image.length <= 0 && this.myEmoji == '') {
                        this.navCtrl.pop();
                    } else {
                        this.myEmoji = image[0];
                        this.participante.emoji = image[0];
                    }
                }, (err) => {
                    console.log("Erro ao capturar imagem");
                });
            }
        }, (err) => {
            console.log("Erro ao obter permissão");
        });
    }

    validForm() {
        var formError = false;

        // Validação de nome
        if (this.participanteForm.controls.nome.valid || this.participanteForm.controls.nome.value != '') {
            this.participante.nome = this.participanteForm.controls.nome.value;
        } else {
            formError = true;
        }

        // Validação de sexo
        if (this.participanteForm.controls.sexo.valid || this.participanteForm.controls.sexo.value != '') {
            this.participante.sexo = this.participanteForm.controls.sexo.value;
        } else {
            formError = true;
        }

        // Validação de imagem
        if (!this.myEmoji || this.myEmoji == '' || typeof this.participante.emoji == "undefined" || this.participante.emoji == '') {
            formError = true;
        }

        if (!formError) {
            this.printMyEmoji();
        }
    }

    printMyEmoji() {
        let loading = this.loadingCtrl.create({
            content: "Enviando seu emoji..."
        });
        loading.present();
        this.participanteService.uploadFile(this.participante).then((data: any) => {
            loading.dismiss();
            if (JSON.parse(data.response).success) {
                this.presentAlert("Imagem enviada com sucesso");
                this.navCtrl.pop();
            } else {
                this.presentAlert("Erro ao enviar imagem");
                this.navCtrl.pop();
            }
        }, (err) => {
            console.log("Erro no printMyEmoji");
            console.log(JSON.stringify(err));
        });
    }

    presentAlert(message) {
        let alert = this.alertCtrl.create({
            title: 'Aviso',
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }
}
