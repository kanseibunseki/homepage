import ThreeBackgroundWrapper from '@/components/ThreeBackgroundWrapper'

export default function TestR3FPage() {
  return (
    <div style={{ 
      position: 'relative', 
      width: '100vw', 
      height: '100vh',
      background: 'linear-gradient(180deg, #0a0a0f 0%, #1a0f2e 50%, #0a0a0f 100%)'
    }}>
      <ThreeBackgroundWrapper />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        textAlign: 'center',
        zIndex: 10
      }}>
        <h1>R3F Migration Test</h1>
        <p>Testing ThreeBackground migration</p>
        <p style={{ fontSize: '12px', marginTop: '20px' }}>
          Mode: {process.env.NEXT_PUBLIC_USE_R3F === 'true' ? 'React Three Fiber' : 'Vanilla Three.js'}
        </p>
      </div>
    </div>
  )
}