import { Editor } from '@tinymce/tinymce-react';

export default function TextEditor({editorRef}) {
  return (
    <>
      <Editor
        apiKey="32ne23x277g7cdbgy01eos5p0f9hlaz55et1nzrf4rra50dl"
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          height: 500,
          menubar: false,
          plugins:
            "advlist autolink lists link image charmap preview anchor searchreplace visualblocks insertdatetime media table code help wordcount fullscreen emoticons codesample",
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter alignright alignjustify |" +
            "bullist numlist outdent indent | image media emoticons link codesample charmap hr |" +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          file_picker_types: "image media",
          file_picker_callback: function (callback, value, meta) {
            console.log(value);
            console.log(meta);
          },
        }}
      />
    </>
  );
}
