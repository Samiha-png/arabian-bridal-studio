import { Camera, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <a href="#home" className="brand">
              Arabian <span>Bridal</span> Studio
            </a>
            <p>
              A luxury bridal couture house inspired by Middle Eastern heritage,
              architectural form, and handcrafted detail. Frontend demo project.
            </p>
            <div className="footer__social">
              <a href="#home" aria-label="Instagram"><Camera size={16} /></a>
              <a href="#home" aria-label="Facebook"><Camera size={16} /></a>
              <a href="#home" aria-label="Email"><Mail size={16} /></a>
            </div>
          </div>

          <div>
            <h4>Collections</h4>
            <ul>
              <li><a href="#collections">Royal Bridal Couture</a></li>
              <li><a href="#collections">Nikkah & Ceremony</a></li>
              <li><a href="#collections">Evening Gowns</a></li>
              <li><a href="#collections">Luxury Formal Wear</a></li>
              <li><a href="#collections">Bespoke Creations</a></li>
            </ul>
          </div>

          <div>
            <h4>Studio</h4>
            <ul>
              <li><a href="#atelier">Our Story</a></li>
              <li><a href="#editorial">Editorial</a></li>
              <li><a href="#consult">Private Consultation</a></li>
              <li><a href="#featured">Featured Designs</a></li>
              <li><a href="#home">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul>
              <li><MapPin size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} /> Studio address placeholder</li>
              <li><Phone size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} /> +00 000 000 0000</li>
              <li><Mail size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} /> hello@example.com</li>
              <li>By appointment only</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Arabian Bridal Studio · Demo Project</span>
          <span>Placeholder contact details · No real inquiries</span>
        </div>
      </div>
    </footer>
  );
}