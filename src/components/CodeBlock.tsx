import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Copy, Check, Terminal } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CodeBlockProps {
    language: string;
    value: string;
    className?: string;
    [key: string]: unknown;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value, className, ...props }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className={cn(
            "my-8 rounded-xl overflow-hidden border transition-colors duration-200 shadow-sm",
            "bg-[var(--code-bg)] border-[var(--border-color)]",
            className
        )}>
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/50 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5 opacity-80">
                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--text-secondary)]/30" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--text-secondary)]/30" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--text-secondary)]/30" />
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[var(--text-secondary)] uppercase">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>{language || 'text'}</span>
                    </div>
                </div>
                <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-all duration-200"
                    title="Copy to clipboard"
                >
                    {copied ? (
                        <Check className="w-4 h-4 text-[var(--success)]" />
                    ) : (
                        <Copy className="w-4 h-4" />
                    )}
                </button>
            </div>
            <div className="relative group p-1">
                <SyntaxHighlighter
                    {...props}
                    language={language}
                    PreTag="div"
                    useInlineStyles={false}
                    customStyle={{
                        margin: 0,
                        padding: '1.5rem',
                        background: 'transparent',
                        fontSize: '0.9rem',
                        lineHeight: '1.6',
                        fontFamily: 'inherit',
                    }}
                    codeTagProps={{
                        style: {
                            fontFamily: 'inherit',
                        },
                    }}
                >
                    {value}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default CodeBlock;
