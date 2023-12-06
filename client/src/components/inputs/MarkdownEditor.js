import React, { memo } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const MarkdownEditor = ({label,value,changeValue,invalidFields,name,setInvalidFields}) => {
  return (
    <div className='flex flex-col'>
        <span>{label}</span>
      <Editor

        apiKey='dgdkogfiephm7xarv2xwigi6syb2atqqruaqiyr98nveh1yu'
        initialValue={value}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onChange={e => changeValue(prev =>({...prev,[name]:e.target.getContent()}))}
        onFocus={()=>{
          setInvalidFields && setInvalidFields([])
        }}
        
      />
      {invalidFields?.some(el => el.name === name) && <small className='text-main text-sm'>{invalidFields?.find(el =>el.name === name)?.mes}</small>}
    </div>
  );
}
export default memo(MarkdownEditor)