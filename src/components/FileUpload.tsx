import React, { useCallback, useState } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

interface FileUploadProps {
    onFileLoaded: (content: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileLoaded }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFile = useCallback((file: File) => {
        setError(null);
        if (!file.name.endsWith('.md')) {
            setError('Please upload a valid Markdown (.md) file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result;
            if (typeof text === 'string') {
                onFileLoaded(text);
            }
        };
        reader.onerror = () => setError('Error reading file.');
        reader.readAsText(file);
    }, [onFileLoaded]);

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
        }
    }, [handleFile]);

    const onDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const onDragLeave = useCallback(() => {
        setIsDragOver(false);
    }, []);

    return (
        <div className="w-full">
            <div
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                className={cn(
                    "relative flex flex-col items-center justify-center w-full py-16 px-8 transition-all duration-300 border-2 border-dashed rounded-2xl cursor-pointer group",
                    // Use CSS variables for standardized theming
                    "bg-[var(--bg-card)]/50 hover:bg-[var(--bg-card)]",
                    "border-[var(--border-color)]",
                    isDragOver
                        ? "border-[var(--accent)] scale-[1.01] shadow-lg shadow-blue-500/10"
                        : "hover:border-[var(--accent)]",
                    error && "border-red-500 hover:border-red-500 bg-red-50/10"
                )}
            >
                <input
                    type="file"
                    accept=".md"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                            handleFile(e.target.files[0]);
                        }
                    }}
                />

                <div className={cn(
                    "p-5 mb-6 rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl",
                    isDragOver
                        ? "bg-blue-100 dark:bg-blue-900 text-[var(--accent)] shadow-lg"
                        : "bg-[var(--bg-primary)] text-[var(--text-primary)] opacity-70 group-hover:opacity-100 group-hover:text-[var(--accent)]"
                )}>
                    <Upload className="w-10 h-10" />
                </div>

                <h3 className="mb-3 text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                    Upload Markdown File
                </h3>
                <p className="mb-8 opacity-60 text-center max-w-sm leading-relaxed text-[var(--text-primary)]">
                    Drag and drop your <code className="px-1.5 py-0.5 rounded bg-[var(--bg-primary)] border border-[var(--border-color)] font-mono text-sm">.md</code> file here
                    <br />or click to browse your computer
                </p>

                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider opacity-40 group-hover:opacity-60 transition-colors text-[var(--text-primary)]">
                    <FileText className="w-4 h-4" />
                    <span>Supports GFM • Math • Syntax Highlighting</span>
                </div>

                {error && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-300 bg-red-100 dark:bg-red-900/40 px-4 py-2 rounded-full animate-fade-in shadow-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{error}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
