import React from 'react'
import '@syncfusion/ej2-react-richtexteditor/styles/material.css';
// import { RichTextEditorComponent } from '@syncfusion/ej2-react-richtexteditor';
import {
  HtmlEditor,
  Image,
  Inject,
  Link,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar
} from '@syncfusion/ej2-react-richtexteditor';
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('VOTRE_CLÉ_DE_LICENCE_ICI');


export default function Editor() {
    // const [editorValue, setEditorValue] = useState('');

  // Méthode de gestion des changements de contenu
  // const onChangeHandler = (args) => {
  //   setEditorValue(args.value);
  // };
  return (
    <div>
      {/* <RichTextEditorComponent
        value={editorValue}
        change={onChangeHandler}  // Mettez à jour la valeur à chaque changement
        height={400}              // Définir la hauteur de l'éditeur
        toolbarSettings={{
          items: [
            'Bold', 'Italic', 'Underline', '|', 'AlignLeft', 'AlignCenter', 'AlignRight', 
            'OrderedList', 'UnorderedList', 'Outdent', 'Indent', '|', 'CreateLink', 'Image',
            'Undo', 'Redo', 'ClearFormat'
          ],
        }}
      /> */}
      <RichTextEditorComponent>
        <p>
          Le composant Rich Text Editor est un éditeur WYSIWYG ("ce que vous voyez est ce que vous obtenez") qui offre la meilleure expérience utilisateur pour créer et mettre à jour du contenu. Les utilisateurs peuvent formater leur contenu en utilisant les commandes standard de la barre d'outils.
        </p>
        <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
      </RichTextEditorComponent>
    </div>
  )
}
