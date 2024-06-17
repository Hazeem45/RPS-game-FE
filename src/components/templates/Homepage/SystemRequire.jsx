import React from 'react';
import { RequirementBackground } from '../../../assets/Image';

function SystemRequire() {
  return (
    <section className='requirements' id='requirements' style={{ background: `radial-gradient(34.26% 75% at 64.32% 47.1%, rgba(255, 255, 255, 0) 3.36%, rgba(0, 0, 0, 0) 19.22%, #000000 99.74%),url(${RequirementBackground})` }}>
      <p>can my computer run this game?</p>
      <div className='container'>
        <div className='title'>
          <h2>system requirements</h2>
        </div>
        <table className='table-cstm'>
          <tbody>
            <tr>
              <td>
                <h4>os:</h4>
                <p>Windows 7 64-bit only (No OSX support at this time)</p>
              </td>
              <td>
                <h4>processor:</h4>
                <p>Intel Core 2 Duo @ 2.4 GHz or AMD Athlon X2 @ 2.8 GHz</p>
              </td>
            </tr>
            <tr>
              <td>
                <h4>memory:</h4>
                <p>4GB RAM</p>
              </td>
              <td>
                <h4>storage:</h4>
                <p>8GB available space</p>
              </td>
            </tr>
            <tr>
              <td colSpan='2'>
                <h4>graphics:</h4>
                <p>
                  Nvidia GForce GTX 660 2GB or <br />
                  AMD Radeon HD 7850 2GB DirectX11 (Shader Model 5)
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default SystemRequire;
