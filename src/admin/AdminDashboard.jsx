import { useState, useEffect } from 'react';
import { pb } from './pocketbase';
import AdminForm from './AdminForm';
import robotBg from '../assets/avatar.png';

export default function AdminDashboard({ onLogout }) {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const loadData = async () => {
    try {
      const records = await pb.collection('servicios').getFullList();
      setItems(records);
    } catch (err) {
      console.error('Error cargando registros:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar este registro?')) {
      try {
        await pb.collection('servicios').delete(id);
        loadData();
      } catch (err) {
        alert('Error al eliminar: ' + err.message);
      }
    }
  };

  const handleLogout = () => {
    pb.authStore.clear();
    if (onLogout) onLogout();
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#050807',
      backgroundImage: `linear-gradient(rgba(5, 8, 7, 0.88), rgba(5, 8, 7, 0.94)), url(${robotBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
      color: '#f8fafc',
      fontFamily: "'Segoe UI', Roboto, sans-serif",
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        
        {/* Encabezado */}
        <header style={{
          textAlign: 'center',
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: '1px solid #1e3a2b'
        }}>
          <h2 style={{ margin: 0, fontSize: '1.8rem', color: '#22c55e', fontWeight: '700' }}>
             Panel de Control
          </h2>
          <p style={{ margin: '5px 0 0 0', color: '#94a3b8', fontSize: '0.9rem' }}>
            Gestión de Servicios de Computación
          </p>
        </header>

        {/* Formulario */}
        <AdminForm 
          collectionName="servicios" 
          recordToEdit={editingItem} 
          onSaved={() => {
            setEditingItem(null);
            loadData();
          }} 
        />

        {/* Lista de Registros */}
        <section style={{ marginTop: '40px' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', color: '#ffffff' }}>
            Servicios Registrados ({items.length})
          </h3>

          {items.length === 0 ? (
            <p style={{ color: '#64748b', fontStyle: 'italic' }}>No hay servicios registrados aún.</p>
          ) : (
            <div style={{ display: 'grid', gap: '15px' }}>
              {items.map((item) => (
                <div key={item.id} style={{
                  backgroundColor: 'rgba(13, 22, 18, 0.85)',
                  border: '1px solid #1e3a2b',
                  borderRadius: '10px',
                  padding: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '20px',
                  backdropFilter: 'blur(4px)'
                }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#ffffff' }}>
                      {item.title || item.nombre}
                    </h4>
                    <p style={{ margin: 0, color: '#a3e635', fontSize: '0.95rem' }}>
                      {item.description || item.descripcion}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', marginLeft: 'auto' }}>
                    <button 
                      onClick={() => setEditingItem(item)} 
                      style={{
                        backgroundColor: '#374151',
                        color: '#fff',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)} 
                      style={{
                        backgroundColor: 'transparent',
                        color: '#ef4444',
                        border: '1px solid #ef4444',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>

      {/* Pie de página */}
      <footer style={{
        marginTop: '60px',
        paddingTop: '20px',
        borderTop: '1px solid #1e3a2b',
        textAlign: 'center'
      }}>
        <button 
          onClick={handleLogout} 
          style={{
            backgroundColor: '#ef4444',
            color: '#ffffff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '0.95rem',
            cursor: 'pointer'
          }}
        >
           Cerrar Sesión
        </button>
      </footer>
    </div>
  );
}