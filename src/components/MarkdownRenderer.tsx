import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import CodeBlock from './CodeBlock';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface MarkdownRendererProps {
    content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    return (
        <div className="w-full max-w-none text-[var(--text-primary)] font-sans leading-relaxed">
            <ReactMarkdown
                remarkPlugins={[remarkMath, remarkGfm]}
                rehypePlugins={[rehypeKatex]}
                components={{
                    // Code blocks and inline code
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    code({ inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        const value = String(children).replace(/\n$/, '');

                        return !inline && match ? (
                            <CodeBlock
                                language={match[1]}
                                value={value}
                                {...props}
                            />
                        ) : (
                            <code
                                className={cn(
                                    "px-1.5 py-0.5 rounded-md font-mono text-[0.9em] border transition-colors duration-200",
                                    "bg-[var(--code-bg)] border-[var(--border-color)] text-[var(--accent)]",
                                    className
                                )}
                                {...props}
                            >
                                {children}
                            </code>
                        );
                    },
                    // Tables
                    table({ children, ...props }) {
                        return (
                            <div className="my-8 w-full overflow-hidden rounded-xl border border-[var(--border-color)] shadow-sm bg-[var(--bg-primary)]">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm" {...props}>
                                        {children}
                                    </table>
                                </div>
                            </div>
                        );
                    },
                    thead({ children, ...props }) {
                        return (
                            <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] text-[var(--text-primary)]" {...props}>
                                {children}
                            </thead>
                        );
                    },
                    tbody({ children, ...props }) {
                        return (
                            <tbody className="divide-y divide-[var(--border-color)]" {...props}>
                                {children}
                            </tbody>
                        );
                    },
                    tr({ children, ...props }) {
                        return (
                            <tr className="hover:bg-[var(--bg-secondary)]/50 transition-colors duration-150" {...props}>
                                {children}
                            </tr>
                        );
                    },
                    th({ children, ...props }) {
                        return (
                            <th className="px-6 py-4 font-bold tracking-wider text-xs uppercase text-[var(--text-secondary)]" {...props}>
                                {children}
                            </th>
                        );
                    },
                    td({ children, ...props }) {
                        return (
                            <td className="px-6 py-4 text-[var(--text-secondary)]" {...props}>
                                {children}
                            </td>
                        );
                    },
                    // Typography elements
                    h1({ children, ...props }) {
                        return <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8 mt-2 text-[var(--text-primary)]" {...props}>{children}</h1>;
                    },
                    h2({ children, ...props }) {
                        return <h2 className="scroll-m-20 border-b border-[var(--border-color)] pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-6 mt-12 text-[var(--text-primary)]" {...props}>{children}</h2>;
                    },
                    h3({ children, ...props }) {
                        return <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4 mt-10 text-[var(--text-primary)]" {...props}>{children}</h3>;
                    },
                    h4({ children, ...props }) {
                        return <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-4 mt-8 text-[var(--text-primary)]" {...props}>{children}</h4>;
                    },
                    p({ children, ...props }) {
                        return <p className="leading-7 [&:not(:first-child)]:mt-6 text-[var(--text-secondary)] text-base md:text-lg" {...props}>{children}</p>;
                    },
                    a({ children, href, ...props }) {
                        return (
                            <a
                                href={href}
                                className="font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] hover:underline decoration-2 underline-offset-4 transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                                {...props}
                            >
                                {children}
                            </a>
                        );
                    },
                    blockquote({ children, ...props }) {
                        return (
                            <blockquote className="mt-8 border-l-4 pl-6 italic py-2 pr-4 rounded-r-lg
                                border-[var(--accent)] 
                                bg-[var(--bg-secondary)]
                                text-[var(--text-secondary)]"
                                {...props}>
                                {children}
                            </blockquote>
                        );
                    },
                    ul({ children, ...props }) {
                        return <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-[var(--text-secondary)] marker:text-[var(--border-color)]" {...props}>{children}</ul>;
                    },
                    ol({ children, ...props }) {
                        return <ol className="my-6 ml-6 list-decimal [&>li]:mt-2 text-[var(--text-secondary)] marker:font-bold marker:text-[var(--text-primary)]" {...props}>{children}</ol>;
                    },
                    li({ children, ...props }) {
                        return <li className="pl-2" {...props}>{children}</li>
                    },
                    hr({ ...props }) {
                        return <hr className="my-10 border-[var(--border-color)]" {...props} />;
                    },
                    img({ src, alt, ...props }) {
                        return <img src={src} alt={alt} className="rounded-xl border border-[var(--border-color)] shadow-sm my-8 max-w-full mx-auto" {...props} />;
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;
