import { LabRegister } from '../laboratorios/labRegister';
import './sidebar.css';

export const Sidebar = () => {
    return (
        <div class="sidebar">
            <div class="navigation">
                <div>
                    <div class="subtitle-container">
                        <span class="side-subtitle">
                            Laboratorios
                        </span>
                    </div>
                    <div class="container-laboratorios">

                        <LabRegister />
                    </div>
                </div>
            </div>
        </div>
    );
}