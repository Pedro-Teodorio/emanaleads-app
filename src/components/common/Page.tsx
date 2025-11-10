import { motion } from 'motion/react'
import { Fragment } from 'react/jsx-runtime'
import { Card, CardContent } from '../ui/card'

interface PageContainerProps {
    children: React.ReactNode
}

function PageContainer({ children }: PageContainerProps) {
    return (
        <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className=" w-full"
        >
            <div className="p-6 lg:p-8 space-y-4">{children}</div>
        </motion.div>
    )
}

interface PageHeaderProps {
    children: React.ReactNode
}

function PageHeader({ children }: PageHeaderProps) {
    return (
        <div className={
            `flex flex-1 flex-col justify-between md:flex-row gap-2`
        }>
            {children}
        </div>
    )
}

function PageTitle({ children }: { children: React.ReactNode }) {
    return (
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {children}
        </h1>
    )
}

function PageDescription({ children }: { children: React.ReactNode }) {
    return <p className="text-muted-foreground">{children}</p>
}

function PageActions({ children }: { children: React.ReactNode }) {
    return <div className="flex items-center gap-2">{children}</div>
}

function PageContent({
    children,
    container,
    className,
}: {
    children: React.ReactNode
    container?: boolean
    className?: string
}) {
    return (
        <Fragment>
            {container ? (
                <Card className={`border-0 shadow-md ${className}`}>
                    <CardContent>{children}</CardContent>
                </Card>
            ) : (
                <div className={`w-full flex flex-col gap-4 ${className}`}>{children}</div>
            )}
        </Fragment>
    )
}

export {
    PageContainer,
    PageHeader,
    PageTitle,
    PageDescription,
    PageActions,
    PageContent,
}