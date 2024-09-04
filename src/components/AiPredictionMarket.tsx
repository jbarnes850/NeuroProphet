'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, TrendingUp, Sparkles, Coins } from 'lucide-react'

export function AiPredictionMarket() {
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    // Simulating initial data fetch
    setPredictions([
      { id: 1, text: "Bitcoin will reach $100,000 by end of 2024", confidence: 0.85, stakes: 1000 },
      { id: 2, text: "Ethereum will surpass Bitcoin in market cap within 5 years", confidence: 0.62, stakes: 750 },
    ])
  }, [])

  const generatePrediction = async () => {
    setLoading(true)
    // Simulating API calls and prediction generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    const newPrediction = {
      id: predictions.length + 1,
      text: `New AI-generated prediction about ${query}`,
      confidence: Math.random().toFixed(2),
      stakes: 0
    }
    setPredictions([newPrediction, ...predictions])
    setLoading(false)
    setQuery('')
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">AI-Powered Crypto Prediction Market</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Generate New Prediction</CardTitle>
          <CardDescription>Enter a crypto-related topic to generate a new AI prediction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="e.g., Ethereum price trend"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button onClick={generatePrediction} disabled={loading || !query}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Generate
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {predictions.map((prediction) => (
          <Card key={prediction.id}>
            <CardHeader>
              <CardTitle className="text-lg">Prediction #{prediction.id}</CardTitle>
              <CardDescription>{prediction.text}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <Badge variant="secondary">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  Confidence: {prediction.confidence}
                </Badge>
                <Badge variant="outline">
                  <Coins className="mr-1 h-3 w-3" />
                  Stakes: {prediction.stakes} NEAR
                </Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Stake on this Prediction</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}