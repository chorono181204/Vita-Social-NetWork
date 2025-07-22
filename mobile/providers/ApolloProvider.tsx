import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '@/apollo/clients'

interface Props {
  children: React.ReactNode
}

export default function CustomApolloProvider({ children }: Props) {
  return (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  )
} 