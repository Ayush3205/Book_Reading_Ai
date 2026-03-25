'use client'

import { useRef } from 'react'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'
import { LucideIcon, CheckCircle, X } from 'lucide-react'
import { FormItem, FormLabel, FormMessage } from '@/components/ui/form'

interface FileUploaderProps<T extends FieldValues> {
    control: Control<T>
    name: FieldPath<T>
    label: string
    acceptTypes: string[]
    icon: LucideIcon
    placeholder: string
    hint: string
    disabled?: boolean
}

const FileUploader = <T extends FieldValues>({
    control,
    name,
    label,
    acceptTypes,
    icon: Icon,
    placeholder,
    hint,
    disabled,
}: FileUploaderProps<T>) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const { field, fieldState } = useController({ control, name })
    const file: File | undefined = field.value

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        if (disabled) return
        const dropped = e.dataTransfer.files[0]
        if (dropped) field.onChange(dropped)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0]
        if (f) field.onChange(f)
    }

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation()
        field.onChange(undefined)
        if (inputRef.current) inputRef.current.value = ''
    }

    return (
        <FormItem>
            <FormLabel className="form-label">{label}</FormLabel>
            <div
                className={`upload-dropzone border-2 border-dashed border-[var(--border-medium)] ${file ? 'upload-dropzone-uploaded' : ''} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => !file && !disabled && inputRef.current?.click()}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={acceptTypes.join(',')}
                    className="hidden"
                    disabled={disabled}
                    onChange={handleChange}
                />

                {file ? (
                    <div className="file-upload-shadow flex-row gap-3">
                        <CheckCircle className="w-6 h-6 text-[#663820] shrink-0" />
                        <span className="upload-dropzone-text flex-1 truncate max-w-[240px]">
                            {file.name}
                        </span>
                        <button
                            type="button"
                            className="upload-dropzone-remove"
                            onClick={handleRemove}
                            disabled={disabled}
                            aria-label="Remove file"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                ) : (
                    <div className="file-upload-shadow">
                        <Icon className="upload-dropzone-icon" />
                        <p className="upload-dropzone-text">{placeholder}</p>
                        <p className="upload-dropzone-hint">{hint}</p>
                    </div>
                )}
            </div>
            <FormMessage />
        </FormItem>
    )
}

export default FileUploader
