'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageDropzoneProps {
  onFileSelected: (file: File) => void;
  disabled?: boolean;
}

export function ImageDropzone({ onFileSelected, disabled }: ImageDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles[0]) onFileSelected(acceptedFiles[0]);
    },
    [onFileSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled,
    maxFiles: 1,
    accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] },
    maxSize: 5 * 1024 * 1024,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border p-12 text-center transition-colors',
        isDragActive && 'border-primary bg-primary/5',
        disabled && 'pointer-events-none opacity-60'
      )}
    >
      <input {...getInputProps()} />
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
        {isDragActive ? (
          <ImageIcon className="h-6 w-6 text-primary" />
        ) : (
          <UploadCloud className="h-6 w-6 text-primary" />
        )}
      </div>
      <p className="font-medium">
        {isDragActive ? 'Lepaskan foto di sini...' : 'Seret & lepas foto wajah, atau klik untuk memilih'}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">Format JPG, PNG, atau WEBP. Maks 5MB.</p>
    </div>
  );
}
