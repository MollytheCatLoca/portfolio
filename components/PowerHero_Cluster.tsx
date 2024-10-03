import React from 'react';

const PowerHero_Cluster = ({ data }) => {
    const { subtitle, title, description, buttonText } = data.heroSection;

    return (
        <div style= {{
        width: '100%',
            height: '180mm',
                backgroundColor: '#0a0b14',
                    position: 'relative',
                        overflow: 'hidden',
                            display: 'flex',
                                flexDirection: 'column',
                                    justifyContent: 'center',
                                        alignItems: 'center',
                                            color: 'white',
                                                padding: '20mm',
    }
}>
    {/* Gradientes de fondo */ }
    < div style = {{
    position: 'absolute',
        top: '-20%',
            left: '-10%',
                width: '50%',
                    height: '50%',
                        background: 'radial-gradient(circle, rgba(64,58,180,0.2) 0%, rgba(0,0,0,0) 70%)',
                            zIndex: 1,
      }}/>
    < div style = {{
    position: 'absolute',
        bottom: '-20%',
            right: '-10%',
                width: '50%',
                    height: '50%',
                        background: 'radial-gradient(circle, rgba(138,58,180,0.2) 0%, rgba(0,0,0,0) 70%)',
                            zIndex: 1,
      }}/>
{/* Contenido */ }
<div style={
    {
        zIndex: 2,
            textAlign: 'center',
      }
}>
    <p style={
        {
            fontSize: '10px',
                textTransform: 'uppercase',
                    letterSpacing: '2px',
                        marginBottom: '10mm',
                            color: '#a6a8b3',
        }
}>
    { subtitle }
    </p>
    < h1 style = {{
    fontSize: '62px',
        fontWeight: 'bold',
            marginBottom: '10mm',
                color: 'white',
        }}>
{
    title.split(' ').map((word, index) =>
        index === 1 ? <span key={ index } style = {{ color: '#8a3ab4' }} > { word } </span> : word + ' '
          )}
</h1>
    < p style = {{
    fontSize: '18px',
        maxWidth: '80%',
            margin: '0 auto 15mm',
                color: '#a6a8b3',
        }}>
    { description }
    </p>
    < div style = {{
    padding: '10px 20px',
        border: '1px solid #a6a8b3',
            borderRadius: '5px',
                display: 'inline-block',
                    fontSize: '14px',
        }}>
    { buttonText }
    </div>
    </div>
    </div>
  );
};

export default PowerHero_Cluster;