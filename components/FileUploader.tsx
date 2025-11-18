"use client";

import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { Button } from './ui/button'
import { cn, convertFileToUrl } from '@/lib/utils'
import Image from 'next/image'
import Thumbnail from './Thumbnail'
import { usePathname } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { MAX_FILE_SIZE } from '@/constants';

interface Props {
  ownerId: string,
  accountId: string, 
  className?: string
}

const FileUploader = ({ownerId, accountId, className}: Props) => {
  const path = usePathname();
  const {toast} = useToast();
  const [files, setFiles] = useState<File[]>([])
  
  const onDrop = useCallback(async (acceptedFiles) => {
    setFiles(acceptedFiles);
    const uploadPromises = acceptedFiles.map(async (file) => {
      if(file.size > MAX_FILE_SIZE) {
        setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));

        return toast({
          description: (
            <p className='body-2 text-white'>
              <span className='font-semibold'>{file.name}</span> is too large.
              Max file size is 50MB.
            </p>
          ),
          className: "error-toast"
        })
      }

      return uploadFile
    })
  })
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

          return toast({
            description: (
              <p className="body-2 text-white">
                <span className="font-semibold">{file.name}</span> is too large.
                Max file size is 50MB.
              </p>
            ),
            className: "error-toast",
          });
        }

        return uploadFile({ file, ownerId, accountId, path }).then(
          (uploadedFile) => {
            if (uploadedFile) {
              setFiles((prevFiles) =>
                prevFiles.filter((f) => f.name !== file.name),
              );
            }
          },
        );
      });

      await Promise.all(uploadPromises);
    },
    [ownerId, accountId, path],
  );
  return (
    <div {...getRootProps()} className='cursor-pointer'>
      <input {...getInputProps()} />
      <Button type='button' className={cn("uploader-button", className)}>
        <Image src="/assets/icons/upload.svg" alt='upload' height={24} width={24}/>{" "}
        <p>Upload</p>
      </Button>
      {files.length > 0 && <ul>
          <h4 className="h4 text-light-100">Upload</h4>
          {files.map((file,index) => {
            const {type, extension} = getFileType(file.name);

            return (
              <li key={`${file.name}-${index}`} className='uploader-preview-item'>
                <div className='flex items-center gap-3'>
                  <Thumbnail type={extension} extension={extension} url={convertFileToUrl(file)}/>
                </div>
              </li>
            )
          })}
        </ul>}
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default FileUploader